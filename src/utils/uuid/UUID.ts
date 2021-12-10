import { randomUUID } from 'crypto';

const V4_REGEX = /^([0-9a-fA-F]){8}(-[0-9a-fA-F]{4}){3}-([0-9a-fA-F]){12}$/;

export type UUIDOptions = {
  disableEntropyCache?: boolean;
};

export default class UUID {
  /**
   *
   * Returns a Boolean value that indicates whether or not the string is
   * a valid UUIDv4.
   *
   * @param uuidString - a string to validate
   * @returns true if string is valid UUID, false otherwise
   *
   */
  static isValid(uuidString: string): boolean {
    return V4_REGEX.test(uuidString);
  }

  /**
   * Generates a random RFC 4122 version 4 UUID
   *
   * @param options{@link UUIDOptions} UUIDOptions
   * @returns a random UUID string
   *
   */
  static generateUUID(options: UUIDOptions = {}): string {
    return randomUUID(options);
  }
}
