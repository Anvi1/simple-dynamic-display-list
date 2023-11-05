import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FavoritesListComponent } from './favorites-list.component';
import { FavoritesListService } from 'src/app/services/favorites-list-service/favorites-list.service';
import { DisplayListData } from 'src/app/interface/display-list-items';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;

  // Mock service
  const mockFavoritesListService = jasmine.createSpyObj('FavoritesListService', ['getFavorites']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesListComponent],
      providers: [
        { provide: FavoritesListService, useValue: mockFavoritesListService },
      ],
    });

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favorites with data from FavoritesListService', () => {
    const mockData: DisplayListData[] = [
      // Mock your favorites data here
    ];
    mockFavoritesListService.getFavorites.and.returnValue(of(mockData));

    fixture.detectChanges();

    expect(component.favorites).toEqual(mockData);
  });
});
