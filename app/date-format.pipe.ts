import {Pipe, PipeTransform} from 'angular2/core';
declare var moment: any;
@Pipe({
  name: "dateFormat",
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  transform = function (input: string){
    var output: "";
    var stringArray = input.split('T');
    return moment(stringArray[0]).format('MM DD YYYY');
  }
}
