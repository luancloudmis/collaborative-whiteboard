import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCustomComponent } from './tool-custom.component';

describe('ToolCustomComponent', () => {
  let component: ToolCustomComponent;
  let fixture: ComponentFixture<ToolCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolCustomComponent]
    });
    fixture = TestBed.createComponent(ToolCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
