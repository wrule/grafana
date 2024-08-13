import chalk from 'chalk';
import dayjs from 'dayjs';

function nowTime() {
  const time = dayjs().format('DD HH:mm:ss.SSS');
  return chalk.bold.black.bgWhite(`[${time}]`);
}

export default
class Logger {
  public static info(...args: any[]) {
    console.log(nowTime(), chalk.white.bgBlue(' INFO '), ...args);
  }
}
