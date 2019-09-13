import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTable } from "./ScoreTable.component";

describe("ScoreTable", () => {
  let component: ScoreTable;
  let fixture: ComponentFixture<ScoreTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreTable]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
