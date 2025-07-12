import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {BreakpointObserver} from "@angular/cdk/layout";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
	providedIn: "root"
})
export class MediaQueryService {
	//region Members
	private readonly breakpoints = {
		exDesk: "(min-width: 1501px)",
		desk: "(min-width: 1200px) and (max-width: 1500px)",
		lap: "(min-width: 992px) and (max-width: 1199px)",
		tab: "(min-width: 577px) and (max-width: 991px)",
		mob: "(min-width: 401px) and (max-width: 576px)",
		tel: "(min-width: 1px) and (max-width: 400px)"
	};
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly destroyRef = inject(DestroyRef);
	public readonly isExDesk = signal(false);
	public readonly isDesk = signal(false);
	public readonly isLap = signal(false);
	public readonly isTab = signal(false);
	public readonly isMob = signal(false);
	public readonly isTel = signal(false);
	//endregion
	//region Constructor
	constructor() {
		this.breakpointObserver.observe(Object.values(this.breakpoints))
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {
				this.updateBreakpoints();
			});
	}
	//endregion
	//region Methods
	private updateBreakpoints(): void {
		this.isExDesk.set(this.breakpointObserver.isMatched(this.breakpoints.exDesk));
		this.isDesk.set(this.breakpointObserver.isMatched(this.breakpoints.desk));
		this.isLap.set(this.breakpointObserver.isMatched(this.breakpoints.lap));
		this.isTab.set(this.breakpointObserver.isMatched(this.breakpoints.tab));
		this.isMob.set(this.breakpointObserver.isMatched(this.breakpoints.mob));
		this.isTel.set(this.breakpointObserver.isMatched(this.breakpoints.tel));
	}
	//endregion
}