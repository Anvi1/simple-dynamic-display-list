import { TestBed } from '@angular/core/testing';
import { FavoritesListService } from './favorites-list.service';
import { DisplayListData } from 'src/app/interface/display-list-items';

describe('FavoritesListService', () => {
  let service: FavoritesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesListService],
    });
    service = TestBed.inject(FavoritesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty list of favorites', (done) => {
    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([]);
      done();
    });
  });

  it('should add a favorite user to the list', (done) => {
    const user: DisplayListData = { 
      id: 2,
      email: 'dec@mail.com',
      first_name: 'test2',
      last_name: 'test2',
      avatar: '',
      is_favorite: true
     };
    service.addFavorite(user);

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([user]);
      done();
    });
  });

  it('should not exceed 10 favorite users', () => {
    const user1: DisplayListData = { 
      id: 1,
      email: 'abc@mail.com',
      first_name: 'test1',
      last_name: 'test1',
      avatar: '',
      is_favorite: false
    };
    const user2: DisplayListData = { 
      id: 2,
      email: 'dec@mail.com',
      first_name: 'test2',
      last_name: 'test2',
      avatar: '',
      is_favorite: true
     };

    // Add 10 users to reach the limit
    for (let i = 0; i < 10; i++) {
      service.addFavorite({ 
        id: 2,
        email: 'dec@mail.com',
        first_name: 'test2',
        last_name: 'test2',
        avatar: '',
        is_favorite: true
       });
    }

    // Adding one more should not exceed the limit
    service.addFavorite(user1);
    service.getFavorites().subscribe((favorites) => {
      expect(favorites.length).toBe(10);
      expect(favorites).toContain(user1);
      expect(favorites).not.toContain(user2);
    });
  });

  it('should remove a favorite user from the list', (done) => {
    const user: DisplayListData = { 
      id: 2,
      email: 'dec@mail.com',
      first_name: 'test2',
      last_name: 'test2',
      avatar: '',
      is_favorite: true
     };

    service.addFavorite(user);
    service.removeFavorite(user);

    service.getFavorites().subscribe((favorites) => {
      expect(favorites).toEqual([]);
      done();
    });
  });
});
