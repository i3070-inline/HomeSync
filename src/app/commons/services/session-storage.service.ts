import {Injectable} from "@angular/core";
import {StorageHandlerBase} from "@services/base/storage-handler-base";

@Injectable({
	providedIn: "root"
})
export class SessionStorageService extends StorageHandlerBase {
	//region Override
	protected override get storage(): Storage {
		return sessionStorage;
	}
	//endregion
}