import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'search',
    pure: false

})
export class SearchPipe implements PipeTransform {
    transform(element: any[], searchInput: string): any[] {
        if(!element) return [];
        if(!searchInput) return element;
        searchInput = searchInput.toLowerCase();
        return element.filter( ele => {
        return ele.label.toLowerCase().includes(searchInput);
        });
        }
}