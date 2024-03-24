import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type IDType = 'number' | 'string' | 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate IDs based on the specified type
export function generateID(type: IDType): number | string {
  switch (type) {
    case 'number':
      return Math.floor(Math.random() * 1000); // Generate a random number ID
    case 'string':
      return Math.random().toString(36).substr(2, 9); // Generate a random string ID
    case 'uuid':
      // You can use any library that generates UUIDs or implement your own UUID generation logic here
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    default:
      throw new Error('Invalid ID type specified');
  }
}
