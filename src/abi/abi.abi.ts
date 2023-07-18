export const ABI_JSON = [
    {
        "type": "error",
        "name": "BulkParametersOfUnequalLength",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ExpiredPresignedEmote",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidSignature",
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Emoted",
        "inputs": [
            {
                "type": "address",
                "name": "emoter",
                "indexed": true
            },
            {
                "type": "address",
                "name": "collection",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "string",
                "name": "emoji",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "on",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "name": "bulkEmote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "collections"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "string[]",
                "name": "emojis"
            },
            {
                "type": "bool[]",
                "name": "states"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "bulkEmoteCountOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "collections"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "string[]",
                "name": "emojis"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "bulkPrepareMessagesToPresignEmote",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "collections"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "string[]",
                "name": "emojis"
            },
            {
                "type": "bool[]",
                "name": "states"
            },
            {
                "type": "uint256[]",
                "name": "deadlines"
            }
        ],
        "outputs": [
            {
                "type": "bytes32[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "bulkPresignedEmote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "emoters"
            },
            {
                "type": "address[]",
                "name": "collections"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "string[]",
                "name": "emojis"
            },
            {
                "type": "bool[]",
                "name": "states"
            },
            {
                "type": "uint256[]",
                "name": "deadlines"
            },
            {
                "type": "uint8[]",
                "name": "v"
            },
            {
                "type": "bytes32[]",
                "name": "r"
            },
            {
                "type": "bytes32[]",
                "name": "s"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "emote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string",
                "name": "emoji"
            },
            {
                "type": "bool",
                "name": "state"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "emoteCountOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string",
                "name": "emoji"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "hasEmoterUsedEmote",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "emoter"
            },
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string",
                "name": "emoji"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "haveEmotersUsedEmotes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "emoters"
            },
            {
                "type": "address[]",
                "name": "collections"
            },
            {
                "type": "uint256[]",
                "name": "tokenIds"
            },
            {
                "type": "string[]",
                "name": "emojis"
            }
        ],
        "outputs": [
            {
                "type": "bool[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "prepareMessageToPresignEmote",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string",
                "name": "emoji"
            },
            {
                "type": "bool",
                "name": "state"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "name": "presignedEmote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "emoter"
            },
            {
                "type": "address",
                "name": "collection"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string",
                "name": "emoji"
            },
            {
                "type": "bool",
                "name": "state"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "uint8",
                "name": "v"
            },
            {
                "type": "bytes32",
                "name": "r"
            },
            {
                "type": "bytes32",
                "name": "s"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    }
]
