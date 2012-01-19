/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/*global ok, is, info, waitForExplicitFinish, finish, executeSoon, gBrowser */
/*global isTiltEnabled, isWebGLSupported, createTab, createTilt */
/*global Services, InspectorUI, NODE_REMOVED, DESTROYED */
"use strict";

let presenter;

function test() {
  if (!isTiltEnabled()) {
    info("Skipping picking delete test because Tilt isn't enabled.");
    return;
  }
  if (!isWebGLSupported()) {
    info("Skipping picking delete test because WebGL isn't supported.");
    return;
  }

  waitForExplicitFinish();

  createTab(function() {
    createTilt({
      onTiltOpen: function(instance)
      {
        presenter = instance.presenter;
        Services.obs.addObserver(whenNodeRemoved, NODE_REMOVED, false);

        presenter.onSetupMesh = function() {
          presenter.highlightNodeAt(presenter.canvas.width / 2,
                                    presenter.canvas.height / 2, {
            onpick: function()
            {
              ok(presenter._currentSelection > 0,
                "Highlighting a node didn't work properly.");
              ok(!presenter.highlight.disabled,
                "After highlighting a node, it should be highlighted. D'oh.");

              presenter.deleteNode();
            }
          });
        };
      }
    });
  });
}

function whenNodeRemoved() {
  ok(presenter._currentSelection > 0,
    "Deleting a node shouldn't change the current selection.");
  ok(presenter.highlight.disabled,
    "After deleting a node, it shouldn't be highlighted.");

  let nodeIndex = presenter._currentSelection;
  let meshData = presenter.meshData;

  for (let i = 0, k = 36 * nodeIndex; i < 36; i++) {
    is(meshData.vertices[i + k], 0,
      "The stack vertices weren't degenerated properly.");
  }

  executeSoon(function() {
    Services.obs.addObserver(cleanup, DESTROYED, false);
    InspectorUI.closeInspectorUI();
  });
}

function cleanup() {
  Services.obs.removeObserver(cleanup, DESTROYED);
  gBrowser.removeCurrentTab();
  finish();
}
