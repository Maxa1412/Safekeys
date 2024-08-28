# SafeKeys

**SafeKeys** is a secure and flexible tool for managing sensitive configuration data in Node.js applications. It offers advanced features for secure key management, environment-specific configurations, and error handling, making it ideal for managing secrets in your projects.

## Features

- **Secure Key Management**: Safely store and retrieve sensitive data like API keys and passwords.
- **Environment-Specific Configurations**: Automatically load environment-based configuration files.
- **Advanced Error Handling**: Comprehensive error codes and messages for troubleshooting.
- **Dynamic Key Validation**: Validate key-value pairs with custom rules.
- **Hot Reloading**: Support for hot reloading of configuration files.

## Installation

```bash
npm install safekeys
```

## Usage

### Initializing SafeKeys

For **TypeScript** projects:

```typescript
import sks from 'safekeys';

sks.init().then(() => {
  if (sks.has('API_KEY')) {
    console.log('API Key:', sks.get('API_KEY'));
  }
});
```

For **JavaScript** projects:

```javascript
const sks = require('safekeys');

sks.init().then(() => {
  if (sks.has('API_KEY')) {
    console.log('API Key:', sks.get('API_KEY'));
  }
});
```

Or initialize directly:

```javascript
require('safekeys').init();
// Your code...
```

### Error Handling

```typescript
import SKSError from 'safekeys/SKSError';

try {
  // Your logic here
} catch (err) {
  if (err instanceof SKSError) {
    console.error('SafeKeys Error:', err.message);
  }
}
```

## Configuration File (`.sks`)

SafeKeys uses a `.sks` file for storing key-value pairs. The format is simple:

```plaintext
API_KEY=your-api-key-here
DATABASE_URL=your-database-url-here
```

## Adding Values

The `add` function allows you to add values to arrays or key-value pairs to objects within the `.sks` file.

- **For Arrays**: If the specified key refers to an array, you can add new items to it.
- **For Objects**: If the specified key refers to an object, you can add or update key-value pairs within it.

### Example Usage

```javascript
// Adding to an array
sks.add('arrayKey', 'newItem');

// Adding key-value pair to an object
sks.add('objectKey', 'newSubKey', 'newValue');
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## Acknowledgements

Thanks to all contributors and the open-source community for making this project possible.