/**
 *
 * -------- USAGE --------
 *
 * For READING Value for given "key".
 * getItem("users")
 *
 * For CREATING Value with "key".
 * setItem("users" , newValue[])
 *
 * FOR UPDATING Value for given "key".
 * setItem("users" , (prev)=>([...prev , newValue]))
 *
 * For DELETING Value with given "key".
 * deleteItem("users")
 *
 * For DELETING WHOLE STORAGE.
 * deleteStorage()
 *
 */

export function getItem(key) {
  if (key === null || key === undefined || key === "") {
    console.error("key cannot be null or undefined");
    return null;
  }
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    throw new Error(`Unable to read localStorage item "${key}".`, {
      cause: error,
    });
  }
}

export function setItem(key, value) {
  if (key === null || key === undefined || key === "") {
    console.error("key cannot be null or undefined");
    return null;
  }
  try {
    if (typeof value === "function") {
      const prevValue = getItem(key);
      const newValue = value(prevValue);
      return localStorage.setItem(key, JSON.stringify(newValue));
    } else {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    throw new Error(`Unable to Write localStorage item "${key}".`, {
      cause: error,
    });
  }
}

export function deleteItem(key) {
  if (key === null || key === undefined || key === "") {
    console.error("key cannot be null or undefined");
    return null;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error(`Unable to delete localStorage item "${key}".`, {
      cause: error,
    });
  }
}

export function deleteStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    throw new Error(`Unable to Delete localStorage`, {
      cause: error,
    });
  }
}
