import { Pipe } from '@angular/core';

@Pipe({
  name: 'inWinningPattern'
})
export class InWinningPatternPipe {

  transform(value: number, pattern: number[]): boolean {
    return pattern.includes(value)
  }

}
