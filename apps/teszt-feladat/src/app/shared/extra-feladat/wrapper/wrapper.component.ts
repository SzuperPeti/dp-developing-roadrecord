import { AfterContentInit, Component, ContentChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { ProjectionComponent } from '../projection/projection.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements AfterContentInit {

  @ContentChildren(ProjectionComponent) projections: QueryList<ProjectionComponent> = new QueryList();

  ngAfterContentInit(): void {
    if(this.projections.length === 0) {
      throw new Error("projection missing error");
    }

  }

}
