import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'

const nodeDataArray = [
  {
    key: 1,
    name: 'Stella Payne Diaz',
    title: 'CEO',
    dept: 'Management',
    pic: '1.jpg',
    email: 'sdiaz@example.com',
    phone: '(234) 555-6789'
  },
  {
    key: 2,
    name: 'Luke Warm',
    title: 'VP Marketing/Sales',
    dept: 'Management',
    pic: '2.jpg',
    email: 'lwarm@example.com',
    phone: '(234) 555-6789',
    parent: 1
  },
  {
    key: 3,
    name: 'Meg Meehan Hoffa',
    title: 'Sales',
    dept: 'Sales',
    pic: '3.jpg',
    email: 'mhoffa@example.com',
    phone: '(234) 555-6789',
    parent: 2
  },
  {
    key: 4,
    name: 'Peggy Flaming',
    title: 'VP Engineering',
    dept: 'Management',
    pic: '4.jpg',
    email: 'pflaming@example.com',
    phone: '(234) 555-6789',
    parent: 1
  },
  {
    key: 5,
    name: 'Saul Wellingood',
    title: 'Manufacturing',
    dept: 'Production',
    pic: '5.jpg',
    email: 'swellingood@example.com',
    phone: '(234) 555-6789',
    parent: 4
  },
  {
    key: 6,
    name: 'Al Ligori',
    title: 'Marketing',
    dept: 'Marketing',
    pic: '6.jpg',
    email: 'aligori@example.com',
    phone: '(234) 555-6789',
    parent: 2
  },
  {
    key: 7,
    name: 'Dot Stubadd',
    title: 'Sales Rep',
    dept: 'Sales',
    pic: '7.jpg',
    email: 'dstubadd@example.com',
    phone: '(234) 555-6789',
    parent: 3
  },
  {
    key: 8,
    name: 'Les Ismore',
    title: 'Project Mgr',
    dept: 'Production',
    pic: '8.jpg',
    email: 'lismore@example.com',
    phone: '(234) 555-6789',
    parent: 5
  },
  {
    key: 9,
    name: 'April Lynn Parris',
    title: 'Events Mgr',
    dept: 'Marketing',
    pic: '9.jpg',
    email: 'aparris@example.com',
    phone: '(234) 555-6789',
    parent: 6
  },
  {
    key: 10,
    name: 'Xavier Breath',
    title: 'Engineering',
    dept: 'Engineering',
    pic: '10.jpg',
    email: 'xbreath@example.com',
    phone: '(234) 555-6789',
    parent: 4
  },
  {
    key: 11,
    name: 'Anita Hammer',
    title: 'Process',
    dept: 'Production',
    pic: '11.jpg',
    email: 'ahammer@example.com',
    phone: '(234) 555-6789',
    parent: 5
  },
  {
    key: 12,
    name: 'Billy Aiken',
    title: 'Software',
    dept: 'Engineering',
    pic: '12.jpg',
    email: 'baiken@example.com',
    phone: '(234) 555-6789',
    parent: 10
  },
  {
    key: 13,
    name: 'Stan Wellback',
    title: 'Testing',
    dept: 'Engineering',
    pic: '13.jpg',
    email: 'swellback@example.com',
    phone: '(234) 555-6789',
    parent: 10
  },
  {
    key: 14,
    name: 'Marge Innovera',
    title: 'Hardware',
    dept: 'Engineering',
    pic: '14.jpg',
    email: 'minnovera@example.com',
    phone: '(234) 555-6789',
    parent: 10
  },
  {
    key: 15,
    name: 'Evan Elpus',
    title: 'Quality',
    dept: 'Production',
    pic: '15.jpg',
    email: 'eelpus@example.com',
    phone: '(234) 555-6789',
    parent: 5
  },
  {
    key: 16,
    name: 'Lotta B. Essen',
    title: 'Sales Rep',
    dept: 'Sales',
    pic: '16.jpg',
    email: 'lessen@example.com',
    phone: '(234) 555-6789',
    parent: 3
  }
]

function initDiagram() {
  const $ = go.GraphObject.make

  const diagram = new go.Diagram({
    allowCopy: false,
    allowDelete: false,
    initialAutoScale: go.AutoScale.UniformToFill,
    maxSelectionCount: 1,
    validCycle: go.CycleMode.DestinationTree,
    'clickCreatingTool.archetypeNodeData': {
      name: '(New person)',
      title: '(Title)',
      dept: '(Dept)'
    },
    layout: $(go.TreeLayout, {
      treeStyle: go.TreeStyle.LastParents,
      arrangement: go.TreeArrangement.Horizontal,
      angle: 90,
      layerSpacing: 35,
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeAlignment.Bus,
      alternateNodeSpacing: 20
    }),
    'undoManager.isEnabled': true, // enable undo & redo
    'themeManager.changesDivBackground': true,
    'themeManager.currentTheme': 'dark'
  })

  diagram.themeManager.set('dark', {
    colors: {
      background: '#111827',
      text: '#fff',
      subtext: '#d1d5db',
      badge: '#22c55e19',
      badgeBorder: '#22c55e21',
      badgeText: '#4ade80',
      shadow: '#111827',
      dragOver: '#082f49',
      link: '#6b7280',
      div: '#1f2937'
    }
  })

  diagram.addDiagramListener('Modified', (e) => {
    const button = document.getElementById('SaveButton')
    // if (button) button.disabled = !diagram.isModified
    const idx = document.title.indexOf('*')
    if (diagram.isModified) {
      if (idx < 0) document.title += '*'
    } else {
      if (idx >= 0) document.title = document.title.slice(0, idx)
    }

    function mayWorkFor(node1: any, node2: any) {
      if (!(node1 instanceof go.Node)) return false
      if (node1 === node2) return false
      if (node2.isInTreeOf(node1)) return false
      return true
    }
    function findHeadShot(pic: any) {
      if (!pic) return '../samples/images/user.svg'
      return '../samples/images/HS' + pic
    }

    function findLevelColor(node: any) {
      return node.findTreeLevel()
    }

    function toolTipTextConverter(obj: any) {
      if (obj.name === 'EMAIL') return obj.part.data.email
      if (obj.name === 'PHONE') return obj.part.data.phone
    }
    function toolTipAlignConverter(obj: any, tt: any) {
      const d = obj.diagram
      const bot = obj.getDocumentPoint(go.Spot.Bottom)
      const viewPt = d.transformDocToView(bot).offset(0, 35)

      const align =
        d.viewportBounds.height >= viewPt.y / d.scale ? new go.Spot(0.5, 1, 0, 6) : new go.Spot(0.5, 0, 0, -6)

      tt.alignment = align
      tt.alignmentFocus = align.y === 1 ? go.Spot.Top : go.Spot.Bottom
    }

    const toolTip = new go.Adornment(go.Panel.Spot, { isShadowed: true, shadowOffset: new go.Point(0, 2) })
      .add(
        new go.Placeholder(),
        new go.Panel(go.Panel.Auto)
          .add(
            new go.Shape('RoundedRectangle', { strokeWidth: 0, shadowVisible: true }).theme('fill', 'background'),
            new go.TextBlock({ margin: 2 })
              .bindObject('text', 'adornedObject', toolTipTextConverter)
              .theme('stroke', 'text')
              .theme('font', 'normal')
          )
          .bindObject('', 'adornedObject', toolTipAlignConverter)
      )
      .theme('shadowColor', 'shadow')

    diagram.nodeTemplate = new go.Node(go.Panel.Spot, {
      isShadowed: true,
      shadowOffset: new go.Point(0, 2),
      selectionObjectName: 'BODY',
      mouseEnter: (e, node) => (node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 1),
      mouseLeave: (e, node) => (node.findObject('BUTTON').opacity = node.findObject('BUTTONX').opacity = 0)
      //   mouseDragEnter: (e, node, prev) => {
      //     const diagramn = node.diagram
      //     const selnode = diagram.selection.first()
      //     if (!mayWorkFor(selnode, node)) return
      //     const shape = node.findObject('SHAPE')
      //     if (shape) {
      //       shape._prevFill = shape.fill
      //       shape.fill = diagram.themeManager.findValue('dragOver', 'colors') // "#e0f2fe";
      //     }
      //   },
      //   mouseDragLeave: (e, node, next) => {
      //     const shape = node.findObject('SHAPE')
      //     if (shape && shape._prevFill) {
      //       shape.fill = shape._prevFill
      //     }
      //   },
      //   mouseDrop: (e, node) => {
      //     const diagram = node.diagram
      //     const selnode = diagram.selection.first()
      //     if (mayWorkFor(selnode, node)) {
      //       const link = selnode.findTreeParentLink()
      //       if (link !== null) {
      //         link.fromNode = node
      //       } else {
      //         diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port)
      //       }
      //     }
      //   }
    })
      .add(
        new go.Panel(go.Panel.Auto, { name: 'BODY' }).add(
          // define the node's outer shape
          new go.Shape('RoundedRectangle', {
            name: 'SHAPE',
            strokeWidth: 0,
            portId: '',
            spot1: go.Spot.TopLeft,
            spot2: go.Spot.BottomRight
          }).theme('fill', 'background'),
          new go.Panel(go.Panel.Table, { margin: 0.5, defaultRowSeparatorStrokeWidth: 0.5 })
            .theme('defaultRowSeparatorStroke', 'divider')
            .add(
              new go.Panel(go.Panel.Table, { padding: new go.Margin(18, 18, 18, 24) })
                .addColumnDefinition(0, { width: 240 })
                .add(
                  new go.Panel(go.Panel.Table, {
                    column: 0,
                    alignment: go.Spot.Left,
                    stretch: go.Stretch.Vertical,
                    defaultAlignment: go.Spot.Left
                  }).add(
                    new go.Panel(go.Panel.Horizontal, { row: 0 }).add(
                      new go.TextBlock({ editable: true, minSize: new go.Size(10, 14) })
                        .bindTwoWay('text', 'name')
                        .theme('stroke', 'text')
                        .theme('font', 'name'),
                      new go.Panel(go.Panel.Auto, { margin: new go.Margin(0, 0, 0, 10) }).add(
                        new go.Shape('Capsule', { parameter1: 6, parameter2: 6 })
                          .theme('fill', 'badge')
                          .theme('stroke', 'badgeBorder'),
                        new go.TextBlock({
                          editable: true,
                          minSize: new go.Size(10, 12),
                          margin: new go.Margin(2, -1)
                        })
                          .bindTwoWay('text', 'dept')
                          .theme('stroke', 'badgeText')
                          .theme('font', 'badge')
                      )
                    ),
                    new go.TextBlock({ row: 1, editable: true, minSize: new go.Size(10, 14) })
                      .bindTwoWay('text', 'title')
                      .theme('stroke', 'subtext')
                      .theme('font', 'normal')
                  ),
                  new go.Panel(go.Panel.Spot, { isClipping: true, column: 1 }).add(
                    new go.Shape('Circle', { desiredSize: new go.Size(50, 50), strokeWidth: 0 }),
                    new go.Picture({
                      name: 'PICTURE',
                      source: '../samples/images/user.svg',
                      desiredSize: new go.Size(50, 50)
                    }).bind('source', 'pic', findHeadShot)
                  )
                ),
              new go.Panel(go.Panel.Table, {
                row: 1,
                stretch: go.Stretch.Horizontal,
                defaultColumnSeparatorStrokeWidth: 0.5
              }).theme('defaultColumnSeparatorStroke', 'divider')
              // .add(makeBottomButton('EMAIL'), makeBottomButton('PHONE'))
            )
        ), // end Auto Panel
        new go.Shape('RoundedLeftRectangle', {
          alignment: go.Spot.Left,
          alignmentFocus: go.Spot.Left,
          stretch: go.Stretch.Vertical,
          width: 6,
          strokeWidth: 0
        }).themeObject('fill', '', 'levels', findLevelColor),
        $(
          'Button',
          $(go.Shape, 'PlusLine', { width: 8, height: 8, stroke: '#0a0a0a', strokeWidth: 2 }),
          {
            name: 'BUTTON',
            alignment: go.Spot.Right,
            opacity: 0,
            click: (e, button) => addEmployee(button.part)
          },
          new go.Binding('opacity', 'isSelected', (s) => (s ? 1 : 0)).ofObject()
        ),
        $(
          'TreeExpanderButton',
          {
            _treeExpandedFigure: 'LineUp',
            _treeCollapsedFigure: 'LineDown',
            name: 'BUTTONX',
            alignment: go.Spot.Bottom,
            opacity: 0 // initially not visible
          },
          new go.Binding('opacity', 'isSelected', (s) => (s ? 1 : 0)).ofObject()
        )
      )
      .theme('shadowColor', 'shadow')
      .bind('text', 'name')
      .bindObject('layerName', 'isSelected', (sel) => (sel ? 'Foreground' : ''))
      .bindTwoWay('isTreeExpanded')
  })
  function addEmployee(node: any) {
    if (!node) return
    const thisemp = node.data
    let newnode
    diagram.model.commit((m) => {
      const newemp = { name: '(New person)', title: '(Title)', dept: thisemp.dept, parent: thisemp.key }
      m.addNodeData(newemp)
      newnode = diagram.findNodeForData(newemp)
      if (newnode) newnode.location = node.location
    }, 'add employee')
    diagram.commandHandler.scrollToPart(newnode)
  }

  diagram.nodeTemplate.contextMenu = $(
    'ContextMenu',
    // $('ContextMenuButton', $(go.TextBlock, 'Add Employee'), {
    //   click: (e, button) => addEmployee(button.part.adornedPart)
    // }),
    $('ContextMenuButton', $(go.TextBlock, 'Vacate Position'), {
      //   click: (e, button) => {
      //     const node = button.part.adornedPart
      //     if (node !== null) {
      //       const thisemp = node.data
      //       myDiagram.model.commit((m) => {
      //         // update the name, picture, email, and phone, but leave the title/department
      //         m.set(thisemp, 'name', '(Vacant)')
      //         m.set(thisemp, 'pic', '')
      //         m.set(thisemp, 'email', 'none')
      //         m.set(thisemp, 'phone', 'none')
      //       }, 'vacate')
      //     }
      //   }
    }),
    $('ContextMenuButton', $(go.TextBlock, 'Remove Role'), {
      //   click: (e, button) => {
      //     // reparent the subtree to this node's boss, then remove the node
      //     const node = button.part.adornedPart
      //     if (node !== null) {
      //       myDiagram.model.commit((m) => {
      //         const chl = node.findTreeChildrenNodes()
      //         // iterate through the children and set their parent key to our selected node's parent key
      //         while (chl.next()) {
      //           const emp = chl.value
      //           m.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key)
      //         }
      //         // and now remove the selected node itself
      //         m.removeNodeData(node.data)
      //       }, 'reparent remove')
      //     }
      //   }
    }),
    $('ContextMenuButton', $(go.TextBlock, 'Remove Department'), {
      //   click: (e, button) => {
      //     // remove the whole subtree, including the node itself
      //     const node = button.part.adornedPart
      //     if (node !== null) {
      //       diagram.commit((d) => d.removeParts(node.findTreeParts()), 'remove dept')
      //     }
      //   }
    })
  )

  diagram.linkTemplate = $(
    go.Link,
    { routing: go.Routing.Orthogonal, layerName: 'Background', corner: 5 },
    $(go.Shape, { strokeWidth: 2 }, new go.ThemeBinding('stroke', 'link'))
  )

  load()

  function load() {
    diagram.model = go.Model.fromJson(nodeDataArray)
    // make sure new data keys are unique positive integers
    let lastkey = 1
    diagram.model.makeUniqueKeyFunction = (model, data) => {
      let k = data.key || lastkey
      while (model.findNodeDataForKey(k)) k++
      data.key = lastkey = k
      return k
    }
  }

  return diagram
}

function Users() {
  return (
    <div>
      {' '}
      <button id="SaveButton" disabled={false}>
        Save
      </button>
      <button>Load</button>
      <ReactDiagram
        style={{
          height: '800px'
        }}
        initDiagram={initDiagram}
        divClassName="go.TreeModel"
        nodeDataArray={nodeDataArray}
        // onModelChange={handleModelChange}
      />
    </div>
  )
}

export default Users
