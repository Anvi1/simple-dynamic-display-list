import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DisplayListComponent } from './display-list.component';
import { DisplayListService } from '../services/display-list-service/display-list.service';
import { FavoritesListService } from '../services/favorites-list-service/favorites-list.service';
import { NewUserService } from '../services/new-user-service/new-user.service';
import { DisplayListData } from '../interface/display-list-items';

describe('DisplayListComponent', () => {
  let component: DisplayListComponent;
  let fixture: ComponentFixture<DisplayListComponent>;

  // Mock services
  const mockDisplayListService = jasmine.createSpyObj('DisplayListService', ['getList', 'getDisplayListFromApi', 'setDisplayList']);
  const mockFavoritesListService = jasmine.createSpyObj('FavoritesListService', ['addFavorite', 'removeFavorite']);
  const mockNewUserService = jasmine.createSpyObj('NewUserService', ['startFetchingNewUsers']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayListComponent],
      providers: [
        { provide: DisplayListService, useValue: mockDisplayListService },
        { provide: FavoritesListService, useValue: mockFavoritesListService },
        { provide: NewUserService, useValue: mockNewUserService },
      ],
    });

    fixture = TestBed.createComponent(DisplayListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with cached data from DisplayListService', () => {
    const mockData: DisplayListData[] = [
      // Mock your data here
    ];
    mockDisplayListService.getList.and.returnValue(of(mockData));

    fixture.detectChanges();

    expect(component.list).toEqual(mockData);
  });

  it('should fetch data from API if no cached data', () => {
    mockDisplayListService.getList.and.returnValue(of([]));
    const mockData: DisplayListData[] = [
      // Mock your data here
    ];
    mockDisplayListService.getDisplayListFromApi.and.returnValue(of(mockData));

    fixture.detectChanges();

    expect(component.list).toEqual(mockData);
  });

  it('should handle errors when fetching data from API', () => {
    mockDisplayListService.getList.and.returnValue(of([]));
    const error = new Error('Test error');
    mockDisplayListService.getDisplayListFromApi.and.returnValue(throwError(error));

    fixture.detectChanges();

    expect(component.displayErrorWarning).toBe(true);
    expect(console.error).toHaveBeenCalledWith('Component level error:', error);
  });

  it('should add and remove from favorites list', () => {
    const item: DisplayListData = {
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
      is_favorite: false
    };

    component.favouriteIconClicked(item);

    expect(item.is_favorite).toBe(true);
    expect(mockFavoritesListService.addFavorite).toHaveBeenCalledWith(item);
    expect(component.displayAddToFavoritesWarning).toBe(true);

    component.favouriteIconClicked(item);

    expect(item.is_favorite).toBe(false);
    expect(mockFavoritesListService.removeFavorite).toHaveBeenCalledWith(item);
    expect(component.displayAddToFavoritesWarning).toBe(false);
  });
});