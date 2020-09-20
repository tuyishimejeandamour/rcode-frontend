import { Injectable } from '@angular/core';
export interface TreeData {
  name: string;
  iconname?: string;
  children?: TreeData[];
}
@Injectable({
  providedIn: 'root'
})
export class FiletreeService {

  constructor() { }

  getTreeData1(): TreeData[] {
    return [
      {
        name: 'tuyishime',
        iconname: 'folder',
        children: [
          { name: 'index.php', iconname: 'note', },
          {
            name: 'asset',
            iconname: 'folder',
            children: [
              { name: 'logo.png', iconname: 'note' },
              { name: 'background.png', iconname: 'note' }
            ]
          },
          {
            name: 'app',
            iconname: 'folder',
            children: [
              { name: 'app.componet.html', iconname: 'note' }
            ]
          }
        ]
      },
    ];
  }
}