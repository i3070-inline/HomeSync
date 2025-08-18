import {inject, Injectable} from "@angular/core";
import {ValidatorHandlerService} from "@services/validator-handler.service";
import {PlatformService} from "@services/platform.service";
import {NotifyHandlerService} from "@services/notify-handler.service";
import {ModalHandlerService} from "@services/modal-handler.service";
import {MediaQueryService} from "@services/media-query.service";
import {buildIconSvgPath} from "@utils/path-icon-helper";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
	providedIn: "root"
})
export class UiFacadeService {
	//region Services
	public readonly validatorHandler = inject(ValidatorHandlerService);
	public readonly platformHandler = inject(PlatformService);
	public readonly notifyHandler = inject(NotifyHandlerService);
	public readonly modalHandler = inject(ModalHandlerService);
	public readonly mediaQueryHandler = inject(MediaQueryService);
	public readonly translateHandler = inject(TranslocoService);
	//endregion
	//region Methods
	public readonly buildIconSvgPath = buildIconSvgPath;
	//endregion
}
