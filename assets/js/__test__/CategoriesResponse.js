export default {
    "@context": "/api/contexts/Category",
    "@id": "/api/categories",
    "@type": "hydra:Collection",
    "hydra:member": [
        {
            "@id": "/api/categories/1",
            "@type": "Category",
            "name": "Category 0",
            "subcategories": [
                {
                    "@id": "/api/subcategories/1",
                    "@type": "Subcategory",
                    "name": "Subcategory0"
                },
                {
                    "@id": "/api/subcategories/3",
                    "@type": "Subcategory",
                    "name": "Subcategory2"
                }
            ]
        },
        {
            "@id": "/api/categories/2",
            "@type": "Category",
            "name": "Category 1",
            "subcategories": []
        },
        {
            "@id": "/api/categories/3",
            "@type": "Category",
            "name": "Category 2",
            "subcategories": [
                {
                    "@id": "/api/subcategories/2",
                    "@type": "Subcategory",
                    "name": "Subcategory1"
                },
                {
                    "@id": "/api/subcategories/4",
                    "@type": "Subcategory",
                    "name": "Subcategory3"
                },
                {
                    "@id": "/api/subcategories/5",
                    "@type": "Subcategory",
                    "name": "Subcategory4"
                }
            ]
        },
        {
            "@id": "/api/categories/4",
            "@type": "Category",
            "name": "Category 3",
            "subcategories": []
        },
        {
            "@id": "/api/categories/5",
            "@type": "Category",
            "name": "Category 4",
            "subcategories": []
        }
    ],
    "hydra:totalItems": 5
}