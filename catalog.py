#!/usr/bin/env python3
"""List currently free Apex lessons with Python 3.9+ standard library only."""
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError


def main():
    request = Request("https://apexai.academy/api/public/content",
                      headers={"Accept": "application/json", "User-Agent": "ApexSampleAgents/1.0"})
    with urlopen(request, timeout=15) as response:
        catalog = json.load(response)
    count = 0
    for course in catalog["courses"]:
        for module in course["modules"]:
            for lesson in module["lessons"]:
                if lesson.get("open_to_everyone") and lesson.get("readable"):
                    count += 1
                    print(f"{course['title']} / {module['title']}: {lesson['title']}")
                    print(f"  https://apexai.academy/lesson.html?id={lesson['id']}")
    if not count:
        print("No free lessons are currently available.")


if __name__ == "__main__":
    try:
        main()
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError) as error:
        print(f"Could not read Apex catalog: {error}", file=sys.stderr)
        sys.exit(1)
