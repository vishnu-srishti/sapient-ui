import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        CommonService
      ]
    }).compileComponents();
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getApiResponse', () => {

    const request = [
      {
        url: 'GET',
        type: 'GET',
        response: 'GET'
      },
    ];
    request.forEach(({ url, type, response }) => {
      it(`should have been called type ${type}`, () => {
        switch (url) {
          case 'GET':
            spyOn(service, 'httpResponseGet').and.returnValue(of([response]));
            break;
        }
        if (['GET'].includes(type)) {
          service.getApiResponse(url, type).subscribe(result => {
            expect(result).toEqual([response]);
          });
        }
      });
    });
  });

  describe('httpResponseGet', () => {
    it('should have been called', () => {
      service.httpResponseGet('');
    });
  });

  describe('handleResponse', () => {
    it('should have been called', () => {
      service.handleResponse('');
    });
  });

  describe('handleError', () => {
    const mockError = {
      message: null
    };
    it('should have been called', () => {
      service.handleError(mockError);
    });
  });

  describe('pendingStatus', () => {
    it('should have been called', () => {
      spyOn(service.pendingStatusObservable, 'next');
      service.pendingStatus(true);
      expect(service.pendingStatusObservable.next).toHaveBeenCalled();
    });
  });

});
