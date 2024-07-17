import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the default number of cards', () => {
    const defaultNumberOfCards = service.getNumberOfCardsOptionByIndex();
    expect(defaultNumberOfCards).toBe(24); // Assuming default index is 2
  });

  it('should return the correct number of cards for a given index', () => {
    const numberOfCards = service.getNumberOfCardsOptionByIndex(1);
    expect(numberOfCards).toBe(16);
  });
});
