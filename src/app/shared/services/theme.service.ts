import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

    darkTheme: boolean = false;

    constructor() {
        const storedValue = localStorage.getItem('theme');
        if (storedValue != null) {
            this.darkTheme = storedValue == 'true';
        }

        console.log('local storage theme is: ' + this.darkTheme);
        if (this.darkTheme) {
            this.useDarkTheme();
        }
    }

    useDarkTheme(): void {
        this.darkTheme = true;
        localStorage.setItem('theme', `${this.darkTheme}`);
        document.getElementById('global-theme')?.setAttribute('href', 'assets/themes/dark-theme.css');
    }

    useLightTheme(): void {
        this.darkTheme = false;
        localStorage.setItem('theme', `${this.darkTheme}`);
        console.log('theme set to: ' + this.darkTheme);
        document.getElementById('global-theme')?.setAttribute('href', 'assets/themes/light-theme.css');
    }

    toggleTheme(): void {
        if (this.darkTheme) {
            this.useLightTheme();
        } else {
            this.useDarkTheme();
        }
    }
}
