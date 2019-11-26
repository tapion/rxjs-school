import { updateDisplay, displayLog } from './utils';
import { api } from './api';
import { fromEvent } from 'rxjs';
import { map, scan, tap, concatMap, catchError, retry } from 'rxjs/operators';

export default () => {
    /** start coding */

    const button = document.getElementById('btn');

    /** get comments on button click */
    fromEvent(button, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),
        concatMap(id => api.getComment(id).pipe(
            retry(6)
            /*catchError((err, obser) => {
                console.log('Error dentro del operator - concatMap: ' + err.message);
                return obser;
            })*/
        )),
        map(JSON.stringify),
        tap(console.log),
    ).subscribe(displayLog, err => console.log('Error en el subscribe: ' + err.message));

    /** end coding */
}