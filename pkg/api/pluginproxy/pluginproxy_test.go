package pluginproxy

import (
	"net/http"
	"testing"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/plugins"
	"github.com/grafana/grafana/pkg/setting"
	"github.com/grafana/grafana/pkg/util"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPluginProxy(t *testing.T) {
	t.Run("When getting proxy headers", func(t *testing.T) {
		route := &plugins.AppPluginRoute{
			Headers: []plugins.AppPluginRouteHeader{
				{Name: "x-header", Content: "my secret {{.SecureJsonData.key}}"},
			},
		}

		setting.SecretKey = "password"

		bus.AddHandler("test", func(query *models.GetPluginSettingByIdQuery) error {
			key, err := util.Encrypt([]byte("123"), "password")
			if err != nil {
				return err
			}

			query.Result = &models.PluginSetting{
				SecureJsonData: map[string][]byte{
					"key": key,
				},
			}
			return nil
		})

		header, err := getHeaders(route, 1, "my-app")
		require.NoError(t, err)

		assert.Equal(t, "my secret 123", header.Get("x-header"))
	})

	t.Run("When SendUserHeader config is enabled", func(t *testing.T) {
		req := getPluginProxiedRequest(
			t,
			&models.ReqContext{
				SignedInUser: &models.SignedInUser{
					Login: "test_user",
				},
			},
			&setting.Cfg{SendUserHeader: true},
			nil,
		)

		// Get will return empty string even if header is not set
		assert.Equal(t, "test_user", req.Header.Get("X-Grafana-User"))
	})

	t.Run("When SendUserHeader config is disabled", func(t *testing.T) {
		req := getPluginProxiedRequest(
			t,
			&models.ReqContext{
				SignedInUser: &models.SignedInUser{
					Login: "test_user",
				},
			},
			&setting.Cfg{SendUserHeader: false},
			nil,
		)
		// Get will return empty string even if header is not set
		assert.Equal(t, "", req.Header.Get("X-Grafana-User"))
	})

	t.Run("When SendUserHeader config is enabled but user is anonymous", func(t *testing.T) {
		req := getPluginProxiedRequest(
			t,
			&models.ReqContext{
				SignedInUser: &models.SignedInUser{IsAnonymous: true},
			},
			&setting.Cfg{SendUserHeader: true},
			nil,
		)

		// Get will return empty string even if header is not set
		assert.Equal(t, "", req.Header.Get("X-Grafana-User"))
	})

	t.Run("When getting templated url", func(t *testing.T) {
		route := &plugins.AppPluginRoute{
			URL:    "{{.JsonData.dynamicUrl}}",
			Method: "GET",
		}

		bus.AddHandler("test", func(query *models.GetPluginSettingByIdQuery) error {
			query.Result = &models.PluginSetting{
				JsonData: map[string]interface{}{
					"dynamicUrl": "https://dynamic.grafana.com",
				},
			}
			return nil
		})

		req := getPluginProxiedRequest(
			t,
			&models.ReqContext{
				SignedInUser: &models.SignedInUser{
					Login: "test_user",
				},
			},
			&setting.Cfg{SendUserHeader: true},
			route,
		)
		header, err := getHeaders(route, 1, "my-app")
		require.NoError(t, err)
		assert.Equal(t, "", header.Get("X-Grafana-User"))
		assert.Equal(t, "https://dynamic.grafana.com", req.URL.String())
		assert.Equal(t, "{{.JsonData.dynamicUrl}}", route.URL)
	})
}

// getPluginProxiedRequest is a helper for easier setup of tests based on global config and ReqContext.
func getPluginProxiedRequest(t *testing.T, ctx *models.ReqContext, cfg *setting.Cfg, route *plugins.AppPluginRoute) *http.Request {
	// insert dummy route if none is specified
	if route == nil {
		route = &plugins.AppPluginRoute{
			Path:    "api/v4/",
			URL:     "https://www.google.com",
			ReqRole: models.ROLE_EDITOR,
		}
	}
	proxy, err := NewApiPluginProxy(ctx, "", route, "", cfg)
	So(err, ShouldBeNil)

	req, err := http.NewRequest(http.MethodGet, route.URL, nil)
	require.NoError(t, err)
	proxy.Director(req)
	return req
}
