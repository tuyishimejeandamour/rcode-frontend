import { Injectable } from '@angular/core';
export default interface FileB{
  type: string,
  path: string,
  timestamp: number,
  size: number,
  basename: string,
  dirname: string,
  extension: string,
  filename: string
}
export interface Properties{
  padding:number;
  active:boolean;
  file?:FileB[];
}
export interface TreeData {
  type: string,
  path: string,
  size?: number,
  extension?: string,
  timestamp: number,
  dirname: string,
  basename: string,
  properties:Properties
  children?: TreeData[];
}
@Injectable({
  providedIn: 'root'
})
export class FiletreeService {

  constructor() { }
  goCode = "package main\n\nimport (\n    \"html/template\"\n    \"log\"\n    \"net/http\"\n    \"os\"\n    \"path/filepath\"\n)\n\nfunc main() {\n    fs := http.FileServer(http.Dir(\"static\"))\n    http.Handle(\"/static/\", http.StripPrefix(\"/static/\", fs))\n    http.HandleFunc(\"/\", serveTemplate)\n\nlog.Println(\"\\nWeb Server is available at http://localhost:3000/example.html\")\n    http.ListenAndServe(\":3000\", nil)\n}\n\nfunc serveTemplate(w http.ResponseWriter, r *http.Request) {\n    lp := filepath.Join(\"templates\", \"layout.html\")\n    fp := filepath.Join(\"templates\", filepath.Clean(r.URL.Path))\n\n    // Return a 404 if the template doesn't exist\n    info, err := os.Stat(fp)\n    if err != nil {\n        if os.IsNotExist(err) {\n            http.NotFound(w, r)\n            return\n        }\n    }\n\n    // Return a 404 if the request is for a directory\n    \n    if info.IsDir() {\n        http.NotFound(w, r)\n        return\n    }\n\n    tmpl, err := template.ParseFiles(lp, fp)\n    if err != nil {\n        // Log the detailed error log.Println(err.Error())\n        // Return a generic \"Internal Server Error\" message\n        http.Error(w, http.StatusText(500), 500)\n        return\n    }\n\n    if err := tmpl.ExecuteTemplate(w, \"layout\", nil); err != nil {\n        log.Println(err.Error())\n        http.Error(w, http.StatusText(500), 500)\n    }\n}";
  pythonCode = "from PyQt5.QtWidgets import *\nimport sys\n\n\nclass Window(QMainWindow):\n    def __init__(self):\n        super().__init__()\n\n        # set the title of main window\n        self.setWindowTitle('My first window - www.luochang.ink')\n\n        # set the size of window\n        self.Width = 500\n        self.height = int(0.618 * self.Width)\n        self.resize(self.Width, self.height)\n\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    ex = Window()\n    ex.show()\n    sys.exit(app.exec_())";
  jsCode = "// Open or close the navbar\n\nfunction openNav() {\n  on();\n  document.getElementById(\"mySidenav\").style.width = \"40%\";\n  document.body.style.backgroundColor = \"rgba(0,0,0,0.5)\";\n}\nfunction closeNav() {\n  document.getElementById(\"mySidenav\").style.width = \"0\";\n  document.body.style.backgroundColor = \"white\";\n}\nfunction on() {\n  document.getElementById(\"overlay\").style.display = \"block\";\n}\nfunction off() {\n  closeNav();\n  document.getElementById(\"overlay\").style.display = \"none\";\n}";
  javaCode = "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        ListNode p, q, pre;\n        ListNode headNode = new ListNode(0);\n        headNode.next = head; \n        p = head;\n        if ( p == null || p.next == null ) return headNode.next;\n        q = head.next;\n        pre = headNode;\n        while (p != null & p.next != null) {\n            p.next = q.next;\n            q.next = p;\n            pre.next = q;\n            p = p.next;\n            if (p == null) break;\n            q = p.next;\n            pre = pre.next.next;\n        }\n        return headNode.next;\n    }\n}";
  htmlCode = "<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n<title>What time is it?<" + "/title>\n<style type=\"text/css\">\n	body {\n		font-family: \"Source Han Sans\", \"San Francisco\", \"PingFang SC\", \"Hiragino Sans GB\", \"Droid Sans Fallback\", \"Microsoft YaHei\", \"sans-serif\";\n		font-size: 14px;\n		color: #333;\n	}\n	p {\n		margin: 1em 0;\n	}\n	p:empty {\n		height: 1.5em;\n	}\n	main {\n		margin: 0 5em;\n		max-width: 48em;\n	}\n	h1 {\n		margin: 1em 0;\n		font-size: 24px;\n		font-weight: 300;\n	}\n	button {\n		background: #fff;\n		border: 1px solid #ccc;\n		border-radius: 2px;\n		line-height: 1;\n		padding: .5em;\n	}\n<" + "/style>\n<" + "/head>\n\n<body>\n<main>\n		\n	<h1>What time is it?<" + "/h1>\n	<p>© 2019 Chang Luo<" + "/p>\n	<hr>\n	\n	<p>Excuse me, what time is it now O_O ???<" + "/p>\n	<br>\n	\n	<button type=\"button\" onclick=\"document.getElementById('time').innerHTML = Date()\">\n		Click Me\n	<" + "/button>\n\n	<p id=\"time\"><" + "/p>\n	\n<" + "/main>" + "\n<script" + ">\n	console.log('Hi there! Welcome to Monaco Speech Editor.');\n	console.log('Monaco Speech Editor is an open source web application.');\n	console.log('The repo address is https://github.com/luochang212/monaco-speech-editor');\n	console.log(\"If you like this web application or think it's useful,\");\n	console.log('could you give me a star on GitHub (●°u°●)​ 」');\n<" + "/script>" + "\n<" + "/body>\n<" + "/html>"
  data: TreeData[] =
  [
    {
      "type": "file",
      "path": ".gitignore",
      "timestamp": 1606110483,
      "size": 26,
      "dirname": "",
      "basename": ".gitignore",
      "extension": "gitignore",
      "properties": {
        "padding": 0,
        "active": false
      }
    },
    {
      "type": "dir",
      "path": "public",
      "timestamp": 1609311341,
      "dirname": "",
      "basename": "public",
      "properties": {
        "padding": 0,
        "active": false
      },
      "children": [
        {
          "type": "file",
          "path": "public/.gitignore",
          "timestamp": 1606110483,
          "size": 16,
          "dirname": "public",
          "basename": ".gitignore",
          "extension": "gitignore",
          "properties": {
            "padding": 0,
            "active": false
          }
        },
        {
          "type": "dir",
          "path": "public/images",
          "timestamp": 1606136736,
          "dirname": "public",
          "basename": "images",
          "properties": {
            "padding": 0,
            "active": false
          },
          "children": [
            {
              "type": "dir",
              "path": "public/images/profile",
              "timestamp": 1609226869,
              "dirname": "public/images",
              "basename": "profile",
              "properties": {
                "padding": 0,
                "active": false
              },
              "children": [
                {
                  "type": "file",
                  "path": "public/images/profile/072746-foldergreen.png",
                  "timestamp": 1609226866,
                  "size": 2035,
                  "dirname": "public/images/profile",
                  "basename": "072746-foldergreen.png",
                  "extension": "png",
                  "properties": {
                    "padding": 0,
                    "active": false
                  }
                },
                {
                  "type": "file",
                  "path": "public/images/profile/130535-edit-user-profile-template-preview.jpg",
                  "timestamp": 1606136736,
                  "size": 62145,
                  "dirname": "public/images/profile",
                  "basename": "130535-edit-user-profile-template-preview.jpg",
                  "extension": "jpg",
                  "properties": {
                    "padding": 0,
                    "active": false
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "dir",
          "path": "public/inspiration",
          "timestamp": 1609059451,
          "dirname": "public",
          "basename": "inspiration",
          "properties": {
            "padding": 0,
            "active": false
          },
          "children": [
            {
              "type": "dir",
              "path": "public/inspiration/background",
              "timestamp": 1609060519,
              "dirname": "public/inspiration",
              "basename": "background",
              "properties": {
                "padding": 0,
                "active": false
              },
              "children": [
                {
                  "type": "file",
                  "path": "public/inspiration/background/091519-brendan-church-HaLpgS9xOgo-unsplash.jpg",
                  "timestamp": 1609060519,
                  "size": 1385308,
                  "dirname": "public/inspiration/background",
                  "basename": "091519-brendan-church-HaLpgS9xOgo-unsplash.jpg",
                  "extension": "jpg",
                  "properties": {
                    "padding": 0,
                    "active": false
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "dir",
          "path": "public/task",
          "timestamp": 1609311341,
          "dirname": "public",
          "basename": "task",
          "properties": {
            "padding": 0,
            "active": false
          },
          "children": [
            {
              "type": "dir",
              "path": "public/task/jaylove",
              "timestamp": 1609311341,
              "dirname": "public/task",
              "basename": "jaylove",
              "properties": {
                "padding": 0,
                "active": false
              },
              "children": [
                {
                  "type": "dir",
                  "path": "public/task/jaylove/good",
                  "timestamp": 1609311341,
                  "dirname": "public/task/jaylove",
                  "basename": "good",
                  "properties": {
                    "padding": 0,
                    "active": false
                  },
                  "children": [
                    {
                      "type": "dir",
                      "path": "public/task/jaylove/good/jaylove",
                      "timestamp": 1609311341,
                      "dirname": "public/task/jaylove/good",
                      "basename": "jaylove",
                      "properties": {
                        "padding": 0,
                        "active": false
                      },
                      "children": [
                        {
                          "type": "file",
                          "path": "public/task/jaylove/good/jaylove/Slides_Unit1.pdf",
                          "timestamp": 1609311341,
                          "size": 6878307,
                          "dirname": "public/task/jaylove/good/jaylove",
                          "basename": "Slides_Unit1.pdf",
                          "extension": "pdf",
                          "properties": {
                            "padding": 0,
                            "active": false
                          }
                        },
                        {
                          "type": "file",
                          "path": "public/task/jaylove/good/jaylove/Year_I_Phy.pdf",
                          "timestamp": 1609311341,
                          "size": 13516251,
                          "dirname": "public/task/jaylove/good/jaylove",
                          "basename": "Year_I_Phy.pdf",
                          "extension": "pdf",
                          "properties": {
                            "padding": 0,
                            "active": false
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "dir",
          "path": "public/userfolders",
          "timestamp": 1609013725,
          "dirname": "public",
          "basename": "userfolders",
          "properties": {
            "padding": 0,
            "active": false
          },
          "children": [
            {
              "type": "dir",
              "path": "public/userfolders/jaylove",
              "timestamp": 1609015023,
              "dirname": "public/userfolders",
              "basename": "jaylove",
              "properties": {
                "padding": 0,
                "active": false
              },
              "children": [
                {
                  "type": "file",
                  "path": "public/userfolders/jaylove/good.txt",
                  "timestamp": 1609015023,
                  "size": 0,
                  "dirname": "public/userfolders/jaylove",
                  "basename": "good.txt",
                  "extension": "txt",
                  "properties": {
                    "padding": 0,
                    "active": false
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  Collapse




  ;
  getTreeData1(): TreeData[] {
    return this.data;
  }

}
