import {Component, Input} from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: []
})
export class BannerComponent {

    @Input('size') size: "medium" | "small" | "large" = "medium";

    constructor(private themeService: ThemeService) {}

    isDarkTheme(): boolean {
        return this.themeService.darkTheme;
    }
}
