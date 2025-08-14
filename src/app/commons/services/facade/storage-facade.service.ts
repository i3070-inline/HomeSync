import {inject, Injectable} from "@angular/core";
import {LocalStorageService} from "@services/local-storage.service";
import {SessionStorageService} from "@services/session-storage.service";

@Injectable({
	providedIn: "root"
})
export class StorageFacadeService {
	public readonly localStorage = inject(LocalStorageService);
	public readonly sessionStorage = inject(SessionStorageService);
}
