# Color Palette Generator API

Simple API that generates color palettes based on a given color.

## Features

- Generate color palettes from a base color
- Support for three harmony types:
  - Analogous (similar colors)
  - Complementary (opposite colors)
  - Monochromatic (tints and shades)
- Return colors in HEX format

## API Endpoints

### Generate Palette

```http
POST /api/palette/generate
```

#### Request Body

```json
{
    "baseColor": "#FF5733",
    "type": "analogous" | "complementary" | "monochromatic"
}
```

#### Response

```json
{
    "success": true,
    "data": {
        "baseColor": "#FF5733",
        "type": "analogous",
        "palette": [
            "#f31d3d",
            "#f92b28",
            "#ff5833",
            "#ff8544",
            "#ffad55"
        ]
    }
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```
   PORT=3000
   ```
4. Run the server:
   ```bash
   npm start
   ```

## Development

Run in development mode with hot reload:
```bash
npm run dev
```

## License

MIT