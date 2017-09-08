livefyre('''
deploy:
  branch: "^(rc|staging|production)$"
  image:
    label: corpjenkins/node
  confirm: true
  git: true
  commands:
    - make clean dist
  lfcdn:
    build: ${currentBuild.startTimeInMillis}
''')
