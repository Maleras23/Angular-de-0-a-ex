import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
// import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  // imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent  implements AfterViewInit{
  gifService = inject(GifService);
  scrollStateService =inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if ( !scrollDiv )return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollService();

  }

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if ( !scrollDiv )return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeigh = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBotton = scrollTop + clientHeigh + 100 >= scrollHeight;
    this.scrollStateService.trendingScrollService.set(scrollTop);

    if (isAtBotton) {
      this.gifService.loadTrendingGifs();
    }
  }
 }
