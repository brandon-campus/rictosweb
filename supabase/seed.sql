-- Insert sample places
INSERT INTO places (
    name,
    description,
    image_url,
    address,
    latitude,
    longitude,
    noise_level,
    price_range,
    opening_hours
) VALUES
(
    'Café Central',
    'Un acogedor café en el centro de la ciudad, perfecto para trabajar o reunirse con amigos.',
    'https://example.com/cafe-central.jpg',
    'Calle Principal 123, Centro',
    40.4168,
    -3.7038,
    'moderate',
    'medium',
    '{
        "monday": {"open": "08:00", "close": "22:00"},
        "tuesday": {"open": "08:00", "close": "22:00"},
        "wednesday": {"open": "08:00", "close": "22:00"},
        "thursday": {"open": "08:00", "close": "22:00"},
        "friday": {"open": "08:00", "close": "23:00"},
        "saturday": {"open": "09:00", "close": "23:00"},
        "sunday": {"open": "09:00", "close": "21:00"}
    }'::jsonb
),
(
    'La Terraza',
    'Restaurante con terraza panorámica y ambiente romántico.',
    'https://example.com/la-terraza.jpg',
    'Avenida del Parque 45, Zona Norte',
    40.4250,
    -3.7000,
    'quiet',
    'high',
    '{
        "monday": {"open": "13:00", "close": "23:00"},
        "tuesday": {"open": "13:00", "close": "23:00"},
        "wednesday": {"open": "13:00", "close": "23:00"},
        "thursday": {"open": "13:00", "close": "23:00"},
        "friday": {"open": "13:00", "close": "00:00"},
        "saturday": {"open": "13:00", "close": "00:00"},
        "sunday": {"open": "13:00", "close": "23:00"}
    }'::jsonb
),
(
    'Café del Barrio',
    'Un lugar tranquilo y acogedor con opciones veganas y sin gluten.',
    'https://example.com/cafe-barrio.jpg',
    'Calle del Barrio 67, Zona Sur',
    40.4100,
    -3.7100,
    'quiet',
    'low',
    '{
        "monday": {"open": "09:00", "close": "20:00"},
        "tuesday": {"open": "09:00", "close": "20:00"},
        "wednesday": {"open": "09:00", "close": "20:00"},
        "thursday": {"open": "09:00", "close": "20:00"},
        "friday": {"open": "09:00", "close": "20:00"},
        "saturday": {"open": "10:00", "close": "20:00"},
        "sunday": {"closed": true}
    }'::jsonb
);

-- Associate tags with places
INSERT INTO place_tags (place_id, tag_id)
SELECT 
    p.id,
    t.id
FROM places p
CROSS JOIN tags t
WHERE 
    (p.name = 'Café Central' AND t.name IN ('Cafetería', 'Tranquilo', 'Wifi', 'Trabajo'))
    OR
    (p.name = 'La Terraza' AND t.name IN ('Restaurante', 'Romántico', 'Terraza', 'Cita'))
    OR
    (p.name = 'Café del Barrio' AND t.name IN ('Cafetería', 'Tranquilo', 'Vegano', 'Sin gluten', 'Local')); 