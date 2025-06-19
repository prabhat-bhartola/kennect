erDiagram
    ITEM {
        string id PK "Random string ID"
        string name "Item name"
        string icon "URL or path to item icon"
        string examine "Description text"
        int limit "Buy/sell limit (nullable)"
        bool members "Is for members"
        int lowalch "Low alchemy value (nullable)"
        int value "Market value"
        int highalch "High alchemy value (nullable)"
        bool is_active "Soft delete flag"
        datetime created_at "Timestamp of creation"
        datetime updated_at "Timestamp of last update"
    }

    PRICE {
        string id PK "ULID identifier"
        int high "High price (nullable)"
        int high_time "Timestamp of high price (nullable)"
        int low "Low price (nullable)"
        int low_time "Timestamp of low price (nullable)"
        string item_id FK "References ITEM.id (unique)"
        datetime created_at "Timestamp of creation"
        datetime updated_at "Timestamp of update"
    }

    ITEM ||--|| PRICE : has
