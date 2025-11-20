using System.Text.Json;
using System.Text.Json.Serialization;

namespace TaskTracker.Converters;

public class IntAsStringEnumConverter<TEnum> : JsonConverter<TEnum> where TEnum : struct, Enum
{
    public override TEnum Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        // Handle string token (e.g., "1")
        if (reader.TokenType == JsonTokenType.String)
        {
            string stringValue = reader.GetString();
            if (int.TryParse(stringValue, out int intValue))
            {
                // Check if the integer value is defined in the enum
                if (Enum.IsDefined(typeof(TEnum), intValue))
                {
                    return (TEnum)Enum.ToObject(typeof(TEnum), intValue);
                }
            }

            // If it's a string but not an integer (e.g., "ToDo"), try parsing as enum name
            if (Enum.TryParse(stringValue, true, out TEnum enumValueByName))
            {
                return enumValueByName;
            }

            // If it's a string we couldn't parse as int or enum name, throw error
            throw new JsonException(
                $"Cannot deserialize string '{stringValue}' " +
                $"to enum type '{typeof(TEnum).Name}'."
            );
        }

        // Handle number token (e.g., 1 directly)
        if (reader.TokenType == JsonTokenType.Number)
        {
            if (reader.TryGetInt32(out int intValue))
            {
                if (Enum.IsDefined(typeof(TEnum), intValue))
                {
                    return (TEnum)Enum.ToObject(typeof(TEnum), intValue);
                }
            }
            // If it's a number but not a valid int32 or not defined
            throw new JsonException(
                $"Cannot deserialize number '{reader.GetDouble()}' " +
                $"to enum type '{typeof(TEnum).Name}'."
            );
        }

        // If it's any other token type (e.g., null, object, array), throw an error
        throw new JsonException(
            $"Cannot deserialize token type '{reader.TokenType}' " +
            $"to enum type '{typeof(TEnum).Name}'."
        );
    }

    public override void Write(
        Utf8JsonWriter writer,
        TEnum value,
        JsonSerializerOptions options)
    {
        // By default, write the enum as its integer value.
        // You can change this to writer.WriteString(value.ToString())
        // if you prefer to serialize to string names.
        writer.WriteNumberValue(Convert.ToInt32(value));
    }
}