import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonService } from 'src/app/common/services/common.service';

import { SpaceXLaunchComponent } from './space-x-launch.component';

describe('SpaceXLaunchComponent', () => {
    let component: SpaceXLaunchComponent;
    let fixture: ComponentFixture<SpaceXLaunchComponent>;
    let service: CommonService;

    const mockResultData = [
        {
            flight_number: 4,
            mission_name: 'RatSat',
            mission_id: [],
            launch_year: '2008',
            launch_date_unix: 1222643700,
            launch_date_utc: '2008-09-28T23:15:00.000Z',
            launch_date_local: '2008-09-28T11:15:00+12:00',
            is_tentative: false,
            tentative_max_precision: 'hour',
            tbd: false,
            launch_window: 0,
            rocket: {
                rocket_id: 'falcon1',
                rocket_name: 'Falcon 1',
                rocket_type: 'Merlin C',
                first_stage: {
                    cores: [
                        {
                            core_serial: 'Merlin2C',
                            flight: 1,
                            block: null,
                            gridfins: false,
                            legs: false,
                            reused: false,
                            land_success: null,
                            landing_intent: false,
                            landing_type: null,
                            landing_vehicle: null
                        }
                    ]
                },
                second_stage: {
                    block: 1,
                    payloads: [
                        {
                            payload_id: 'RatSat',
                            norad_id: [
                                33393
                            ],
                            reused: false,
                            customers: [
                                'SpaceX'
                            ],
                            nationality: 'United States',
                            manufacturer: 'SpaceX',
                            payload_type: 'Satellite',
                            payload_mass_kg: 165,
                            payload_mass_lbs: 363,
                            orbit: 'LEO',
                            orbit_params: {
                                reference_system: 'geocentric',
                                regime: 'low-earth',
                                longitude: null,
                                lifespan_years: null,
                                epoch: '2020-12-21T02:41:06.000Z',
                                mean_motion: 14.84904616,
                                raan: 236.9673,
                                semi_major_axis_km: 6992.022,
                                eccentricity: 0.0012404,
                                periapsis_km: 605.214,
                                apoapsis_km: 622.56,
                                inclination_deg: 9.3453,
                                period_min: 96.975,
                                arg_of_pericenter: 85.029,
                                mean_anomaly: 275.1325
                            }
                        }
                    ]
                },
                fairings: {
                    reused: false,
                    recovery_attempt: false,
                    recovered: false,
                    ship: null
                }
            },
            ships: [],
            telemetry: {
                flight_club: null
            },
            launch_site: {
                site_id: 'kwajalein_atoll',
                site_name: 'Kwajalein Atoll',
                site_name_long: 'Kwajalein Atoll Omelek Island'
            },
            launch_success: true,
            links: {
                mission_patch: 'https://images2.imgbox.com/e0/a7/FNjvKlXW_o.png',
                mission_patch_small: 'https://images2.imgbox.com/e9/c9/T8CfiSYb_o.png',
                reddit_campaign: null,
                reddit_launch: null,
                reddit_recovery: null,
                reddit_media: null,
                presskit: null,
                article_link: 'https://en.wikipedia.org/wiki/Ratsat',
                wikipedia: 'https://en.wikipedia.org/wiki/Ratsat',
                video_link: 'https://www.youtube.com/watch?v=dLQ2tZEH6G0',
                youtube_id: 'dLQ2tZEH6G0',
                flickr_images: []
            },
            details: 'Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1',
            upcoming: false,
            static_fire_date_utc: '2008-09-20T00:00:00.000Z',
            static_fire_date_unix: 1221868800,
            timeline: {
                webcast_liftoff: 5
            },
            crew: null
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [SpaceXLaunchComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpaceXLaunchComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(CommonService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should have been called', () => {
            spyOn(component, 'getSpaceData');
            spyOn(component, 'applySelectedFilters');
            component.ngOnInit();
            expect(component.getSpaceData).toHaveBeenCalledWith(`?limit=100`);
            expect(component.applySelectedFilters).toHaveBeenCalled();
        });
    });

    describe('getSpaceData', () => {
        it('should have been called', () => {
            spyOn(service, 'getApiResponse').and.returnValue(of(mockResultData));
            component.getSpaceData(`?limit=100`);
            expect(service.getApiResponse).toHaveBeenCalled();
        });
    });

});
