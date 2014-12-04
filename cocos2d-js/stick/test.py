import os
import subprocess

env = os.environ
commands = [
      "cmd",
      "/c",
      "java",
      "-version"
  ]
child = subprocess.Popen(commands, stderr=subprocess.PIPE)

jdk_version = None
for line in child.stderr:
    if 'java version' in line:
        if '1.7' in line:
            jdk_version = JDK_1_7
        if '1.6' in line:
            jdk_version = JDK_1_6

child.wait()

print jdk_version