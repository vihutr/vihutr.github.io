import os, json, sys

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
blog_dir = os.path.join(root_dir, "blog")

files = []

for filename in sorted(os.listdir(blog_dir)):
    filepath = os.path.join(blog_dir, filename)
    if os.path.isfile(filepath):
        files.append(filename)

with open(os.path.join(root_dir, "blog_entries.json"), "w") as file:
    json.dump(files, file, indent=2)

print("Updated Entries")
