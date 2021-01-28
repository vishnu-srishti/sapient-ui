import { HttpClientModule, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PendingInterceptorService } from './pending-interceptor.service';

describe('PendingInterceptorService', () => {
  let service: PendingInterceptorService;

  beforeEach(() => {

    const mockHandler = { handle: () => ({ pipe: () => ({}) }) };


    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        PendingInterceptorService,
        { provide: HttpHandler, userValue: mockHandler },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    service = TestBed.inject(PendingInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xdescribe('intercept', () => {
    it('should have been called', () => {
      const mockHandler = TestBed.inject<any>(HttpHandler);
      const mockRequest = TestBed.inject<any>(HttpRequest);
      spyOn(mockHandler, 'handle').and.callThrough();
      service.requestUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
      service.intercept(mockHandler, mockRequest);
      expect(mockHandler.handle).toHaveBeenCalled();
    });
  });

  describe('bypassUrl', () => {
    it('should have been called', () => {
      service.bypassUrl('');
    });
  });

});
