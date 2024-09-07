export class ErrorOr<T> {
	error?: boolean;
	message?: string;
	value?: T;

	constructor(value: T) {
		this.value = value;
	}

	static error<T>(message: string): ErrorOr<T> {
		return {
			error: true,
			message,
		};
	}

	static value<T>(value: T): ErrorOr<T> {
		return {
			value,
		};
	}

	static isError<T>(value: ErrorOr<T>): value is ErrorOr<T> {
		return value.error !== undefined;
	}
}
