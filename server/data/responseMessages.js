const fieldNames = {
  user: {
    usernameOrEmail: "Username or Email",
    username: "Username",
    email: "Email",
    password: "Password",
    firstName: "First name",
    lastName: "Last name",
  },
  noteType: {
    name: "Note type name",
  },
  note: {
    title: "Note title",
    content: "Note content",
    type: "Note type",
  },
};

const validationMessages = {
  isRequired: "is required",
  isInvalid: "is invalid",
};

const requestPaths = {
  auth_signup: "User signup",
  auth_login: "User login",
  users_profile: "Get user profile",
  noteTypes_createCustomNoteType: "Create a user-defined note type",
  noteTypes_getNoteTypes: "Get all note types (System + User-defined)",
  notes_createNote: "Create a note",
  notes_editNote: "Edit a note",
  notes_removeNote: "Remove a note",
  notes_getUserNotes: "Get all notes for a user",
};

const responseMessages = {
  usernameTaken: "Username is already taken",
  emailTaken: "Email is already taken",
  noteTypeExists: "Note type already exists",
  invalidCredentials: "Invalid credentials",
  invalidRequest: "Invalid request",
  serverDefaultError:
    "Server failed to process request. Please try again later.",
  notAuthorized: "Not authorized",
  noToken: "No token",
  tokenFailed: "Token failed",
  userNotFound: "No such user exists",
  responseOf: requestPaths,
  field: fieldNames,
  validation: validationMessages,
};

export default responseMessages;
