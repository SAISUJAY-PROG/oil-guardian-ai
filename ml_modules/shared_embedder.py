"""
Shared sentence-transformer embedder.

Both the Near Miss and Unsafe Condition models use the same
all-MiniLM-L6-v2 embedding model. Loading it once and sharing it
halves the memory used, which matters on Render's 512 MB free plan.
"""

import os

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

_embedder = None


def get_embedder():
    global _embedder

    if _embedder is None:
        import torch
        from sentence_transformers import SentenceTransformer

        # Fewer threads = lower memory use on small servers
        torch.set_num_threads(1)

        print(f"Loading shared embedder: {EMBEDDING_MODEL_NAME}")
        _embedder = SentenceTransformer(EMBEDDING_MODEL_NAME, device="cpu")
        print("Shared embedder loaded.")

    return _embedder
