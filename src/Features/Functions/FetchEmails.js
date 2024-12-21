export function fetchEmails(userEmail) {
  return async () => {
    try {
      const response = await fetch(
        "https://mail-box-client-bdfdd-default-rtdb.firebaseio.com/data.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emails.");
      }

      const data = await response.json();

      const userEmails = Object.values(data)
        .map((entry) => entry.emails)
        .filter((email) => email.to === userEmail);

      return { success: true, data: userEmails };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}