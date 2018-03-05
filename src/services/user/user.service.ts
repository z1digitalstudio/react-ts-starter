import { GetUserResponse } from '../../models/api/user.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environment/environment';
import { Rxios } from 'rxios';
import { tap } from 'rxjs/operators';
import { store } from '../../store/app-state';
import * as userActions from '../../store/user/user.actions';
import { User } from 'src/models/user.model';

export class UserService {

  private http: Rxios;

  constructor() {
    this.http = new Rxios({
      baseURL: environment.apiUrl
    });
  }

  getUser(userId: number): Observable<GetUserResponse> {
    return this.http.get(`/users/${userId}`).pipe(
      tap((res: GetUserResponse) => {
        const newUser: User = new User({
          id: res.data.id,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          avatar: res.data.avatar
        });

        store.dispatch(userActions.set(newUser));
      })
    );
  }

}