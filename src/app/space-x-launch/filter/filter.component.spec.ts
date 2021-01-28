import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/common/components/material/material.module';
import { CommonService } from 'src/app/common/services/common.service';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let service: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [FilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(CommonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should have been called', () => {
      spyOn(component, 'setLaunchYear');
      component.ngOnInit();
      expect(component.setLaunchYear).toHaveBeenCalled();
    });
  });

  describe('setLaunchYear', () => {
    it('should have been called', () => {
      const mockYear = [];
      for (let i = 2006; i <= 2020; i++) {
        mockYear.push(i);
      }
      expect(component.launchYear).toEqual(mockYear);
    });
  });

  describe('selectYear', () => {
    it('should have been called', () => {
      spyOn(component, 'setSelectedFilters');
      component.selectYear(2020);
      expect(component.setSelectedFilters).toHaveBeenCalledWith(2020, null, null);
    });
  });

  describe('setSelectedFilters', () => {
    it('should have been called', () => {
      spyOn(service, 'applySelectedFilters');
      component.setSelectedFilters(2020, null, null);
      const mockSelectedFilters = {
        launchYear: 2020,
        launchSuccess: null,
        landingSuccess: null,
      };
      expect(service.applySelectedFilters).toHaveBeenCalledWith(mockSelectedFilters);
    });
  });

});
