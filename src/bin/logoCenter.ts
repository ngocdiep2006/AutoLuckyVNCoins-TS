/**
 * logoCenter.ts - Căn logo, văn bản ra giữa console
 * Viết bởi ngocdiep2006
 */

//@ts-check
import * as readline from 'readline';

export function logoCenter(logo: string): void {
  const lines = logo.split('\n');
  const terminalWidth = process.stdout.columns;

  const longestLineLength = Math.max(...lines.map(line => line.length));

  const padding = Math.floor((terminalWidth - longestLineLength) / 2);

  lines.forEach(line => {
    console.log(' '.repeat(padding) + line);
  });
}
