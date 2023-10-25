import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule, NzGridModule, NzDropDownModule, NzIconModule, NzButtonModule, HttpClientModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

}
