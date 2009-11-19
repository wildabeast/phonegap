#include <qdebug.h>
#include <qwebview.h>
#include <qwebframe.h>

#include "DebugConsole.h"

DebugConsole::DebugConsole( QWebView *view, BrowserView *bview  )
{
	QWebPage *page = view->page();
	frame = page->mainFrame();
	m_bview = bview;
	
	//attachObject();
	//connect( frame, SIGNAL(javaScriptWindowObjectCleared()), this, SLOT(attachObject()) );
}
/*
void DebugConsole::setWebView( QWebView *view, BrowserView *bview  )
{

}

void DebugConsole::attachObject()
{
    frame->addToJavaScriptWindowObject( QString("DebugConsole"), this );
}
*/
void DebugConsole::log( const QString &param )
{
    qDebug() << param;
    m_bview->debug(param);
}
