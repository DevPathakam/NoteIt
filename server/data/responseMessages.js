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

const requests = {
  createCustomNoteType: "Create a user-defined note type",
  getNoteTypes: "Get all note types (System + User-defined)",
  createNote: "Create a note",
  editNote: "Edit a note",
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
  request: requests,
  field: fieldNames,
  validation: validationMessages,
};

export default responseMessages;
