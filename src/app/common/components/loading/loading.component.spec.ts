import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PendingInterceptorService } from '../../services/pending-interceptor.service';

import { LoadingComponent } from './loading.component';
import { MaterialModule } from '../material/material.module';
import { debounce } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  const mockInterceptor = {
    pendingStatus: of(true)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        MaterialModule,
        HttpClientTestingModule,
      ],
      declarations: [ LoadingComponent ],
      providers: [
        { provide: PendingInterceptorService, userValue: mockInterceptor }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    mockInterceptor.pendingStatus.pipe(
      debounce(component.deBounceHandler.bind(component))
    ).subscribe((result) => {
      component.loaderVisible = result;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
