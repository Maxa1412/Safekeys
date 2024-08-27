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
    console.log('API Key:', get('API_KEY'));
  }
});
```

For **JavaScript** projects:
```javascript
const sks = require('safekeys');

sks.init().then(() => {
  if (sks.has('API_KEY')) {
    console.log('API Key:', get('API_KEY'));
  }
});
```

Or Initialize directly
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## Acknowledgements

Thanks to all contributors and the open-source community for making this project possible.